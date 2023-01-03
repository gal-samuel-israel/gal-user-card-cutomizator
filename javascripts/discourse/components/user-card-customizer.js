import { popupAjaxError } from "discourse/lib/ajax-error";
import { ajax } from "discourse/lib/ajax";
import showModal from "discourse/lib/show-modal";
import { defaultHomepage } from "discourse/lib/utilities";
//import {addSaveableUserField, addSaveableUserOptionField } from "discourse/models/user";
import discourseComputed, { observes, bind } from "discourse-common/utils/decorators";
import { action } from "@ember/object";
import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { and, equal } from "@ember/object/computed";

export default Component.extend({
  router: service(),
  tagName: "",

  /* Object local params */
  
  debugForAdmins: null,
  debugFooter: false,
  debugFocusTrap: false,
    
  init() {

    this._super(...arguments);

    this.showOnlyToAdmins = settings?.enable_modal_only_for_admins; //from settings.yml
    this.debugForAdmins = settings?.enable_debug_for_admins; //from settings.yml
    this.debugFooter = this.debugForAdmins && settings?.enable_modal_footer_internal_debug; //from settings.yml
    this.debug4All = settings?.enable_debug_for_all; //from settings.yml    

    this.debug = false;
    if(this.currentUser.admin && this.debugForAdmins){ this.debug = true; }
    if(this.debug4All){ this.debug = true; }

    if(this.debug){
      console.log('user-car-customizer init:');
    }

    if(!this.currentUser.admin && this.showOnlyToAdmins){
      if(this.debug){
        console.log('destroy');
      }
      this.destroying = true;
      this.destroy();
      return false;
    }         
      
  },  
  
  getUserJSON(user_name){
    ajax(`/u/${user_name}.json`)
    .then((data) => {        
        if(this.debug){     
          console.log('got user info:');
          console.log(data);        
        }
        
      }).catch(popupAjaxError);
  },

  @observes("localVar")
  handleLocalVarChange(){
    if(this.debug){
      console.log('handleLocalVarChange');      
    }    
  },
  
  didInsertElement() {      
    this._super(...arguments);

    if(this.destroying){return;}

    if(this.debug){
      console.log('didInsertElement');      
    }
            
  },

  didRender(){
    this._super(...arguments);

    if(this.destroying){return;}
    
    //visual effects should not be done here as this is run many times
    if(this.debug){
      console.log('didRender');      
    }    
    
  },

  willDestroyElement(element){
    if(this.debug){
      console.log('willDestroyElement:');
      console.log(element);
    }  
    
    //remove event listners here

    this._super(...arguments);
  },

  didDestroyElement() {
    //update any DOM elements after component removal here
  },   

  /* Test action */
  @action
  testAction(event){
    event?.preventDefault();
    if(this.debug){
      console.log('testAction');
      console.log(event);
    }
    //this.set("objVarX", true);
  },

});
