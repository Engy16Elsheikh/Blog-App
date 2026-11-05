// assets/assets.js
import logo from './logo.png';
import lifeStyle from './lifeStyle.jpg';
import arrow from './right-arrow.png';
import facebook_icon from './communication.png'
import twitter_icon from './social.png'
import profile1 from './profile1.jpg'
import profile2 from './profile2.jpg'
import profile3 from './profile3.jpg'
import add_icon from './plus.png'
import blog_icon from './blog.png'
import email_icon from './mail.png'
import upload_area from './upload.png'
export const assets = {
  logo,
  arrow,
  lifeStyle,
  facebook_icon,
  twitter_icon,
  add_icon,
  blog_icon,
  email_icon,
  profile1,
  upload_area
};

export const blog_data = [
  {
    id: 1,
    title: "A detailed step-by-step guide to manage your lifestyle",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: lifeStyle, // Use the imported lifeStyle here
    date: new Date().toISOString(), // Use ISO format for dates
    category: "Lifestyle",
    author: 'Alex Bennete',
    author_img: profile1
  },
  {
    id: 2,
    title: "A detailed step-by-step guide to manage your technology",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: lifeStyle,
    date: new Date().toISOString(),
    category: "Technology",
    author: 'Alex Bennete',
    author_img: profile2
  },
  {
    id: 3,
    title: "A detailed step-by-step guide to manage your technology",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: lifeStyle,
    date: new Date().toISOString(),
    category: "Technology",
    author: 'Alex Bennete',
    author_img: profile3
  },
  {
    id: 4,
    title: "A detailed step-by-step guide to manage your lifestyle",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: lifeStyle, // Use the imported lifeStyle here
    date: new Date().toISOString(), // Use ISO format for dates
    category: "Lifestyle",
    author: 'Alex Bennete',
    author_img: profile3
  },
];
