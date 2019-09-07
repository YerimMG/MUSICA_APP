const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SpotyInfoUser = new Schema({
    country:          String,
    display_name:     String,
    email:            String,
    explicit_content: { 
      filter_enabled: Boolean, 
      filter_locked:  Boolean 
    }, 
    external_urls:    {spotify: String},
    followers:        {
      href:           Boolean,
      total:          Number
    },
    href:             String,
    id:               String,
    images:[{
      height:         Boolean,
      url:            String, 
      width:          Boolean
    }],
    product:          String,
    type: String,
    uri:  String    
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('SpotyInfoUser', SpotyInfoUser);



// {
//   country: 'MX',
//   display_name: 'Yerim MG',
//   email: 'yeral_z2000@hotmail.com',
  // explicit_content: { filter_enabled: false, filter_locked: false },
//   external_urls: { spotify: 'https://open.spotify.com/user/12102467500' },
//   followers: { href: null, total: 39 },
//   href: 'https://api.spotify.com/v1/users/12102467500',
//   id: '12102467500',
//   images: [
//     {
//       height: null,
//       url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/52347471_2473860125975179_3284414254924431360_n.jpg?_nc_cat=105&_nc_oc=AQmvCs0eezay3SdoumPYU0Ebv5GWNUPDTVHuNFFxijuVBge_RGhQYSWgdjYvhLMRbT4&_nc_ht=scontent.xx&oh=8b45df58c06b744fa1042100ed3a90ae&oe=5DFB3232',
//       width: null
//     }
//   ],
//   product: 'premium',
//   type: 'user',
//   uri: 'spotify:user:12102467500'
// }
