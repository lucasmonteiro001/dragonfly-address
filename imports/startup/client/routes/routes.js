import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import '../../../ui/layouts/default';
import '../../../ui/public/index'

const publicRoutes = FlowRouter.group({
    name: 'public',
});

publicRoutes.route( '/', {
    name: 'index',
    action() {
        document.title = "Dragonfly - Mod. Endereços";
        BlazeLayout.render( 'default', { yield: 'index' } );
    }
});

