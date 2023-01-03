import { withPluginApi } from "discourse/lib/plugin-api";
import { apiInitializer } from "discourse/lib/api";

export default {
  name: "user-card-customizer",
  after: 'inject-objects',

  initialize(container) {
    withPluginApi("0.8.31", api => {

      var runThis;  

      if (api.getCurrentUser()) {
        const currentUser = api.getCurrentUser()

        var debug = currentUser.admin && settings.enable_debug_for_admins;
        var debug4All = settings.enable_debug_for_all;
        if(debug4All){ debug = true; }
        
        //const user = container.lookup("service:current-user");

        if(debug){          
          console.log('initializer:');
          //console.log(user);
          //console.log(currentUser.user_option);
          console.log('admin: ' + currentUser.admin); 
        }

        var showOnlyToAdmins = settings.enable_component_only_for_admins; //make this false to enable component all users
        var isAdmin = (currentUser.admin)        
        runThis = (showOnlyToAdmins && isAdmin || !showOnlyToAdmins);

        if(runThis){

          const handleUserCardShow = ((debug)=>{
            if(debug){          
              console.log('handleUserCardShow');  
            }
          });

          const appEvents = container.lookup("service:app-events");
          appEvents.on("user-card:show", handleUserCardShow(debug));

          if(debug){          
            console.log('running');        
          }

          /*
          api.registerConnectorClass("above-site-header", "home-modal", {
            shouldRender() {
              return true;
            },
          });
        
          api.createWidget("home-modal-widget", {
            tagName: "div.home-modal",
          });
          */
        }

      }  

    });

  } 
}