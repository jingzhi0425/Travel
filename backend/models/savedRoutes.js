const mongoose = require('mongoose')

const Routes = new mongoose.Schema(
	{	
		email: {type: String, required: true},
		trips: {type: Array}
		// tripId: {type: String}
        // each_trip = { [{location: String, endDate, startDate, routes}] }
	},
	{ collection: 'saved-routes' }
)

const model = mongoose.model('Saved-Routes', Routes)
module.exports = model

// const mongoose = require('mongoose');

// // Sub-schema for individual trip details
// const Trip = new mongoose.Schema({
//     location: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     routes: { type: Array } // You can define a more specific schema for routes if needed
// });

// // Schema for user routes containing multiple trips
// const Routes = new mongoose.Schema({
//     email: { type: String, required: true },
//     trips: [Trip] // Array of trips, each adhering to the Trip
// }, { collection: 'saved-routes' });

// const RoutesModel = mongoose.model('SavedRoutes', Routes);
// module.exports = RoutesModel;
