import NewsImg from './images/newsportal.png'
import LennoEcom from './images/EcommLenno.jpeg'
import LennoNews from './images/NewsAdminLenno.png'

const Projects = [
    {
        id: 1,
        type:"personal",
        tech:"react",
        title: "News Portal",
        description: "Desing and developed news portal using React and firebase.I use context to fetch data and distribute to all page.",
        icon:"ri-reactjs-fill",
        img:NewsImg,
        gitLink:"https://github.com/aadik6/News_Portal",
        hostedLink:"https://news-portal-98068.web.app/",

    },
    {
        id: 2,
        type:"personal",
        tech:"php",
        title: "Medi Connect",
        description: "created doctors appointment web app. Where user take appointment from doctors and doctors manage appointment and admin manages entire app.",
        icon:"ri-php-fill",
        img:NewsImg,
        gitLink:"https://github.com/aadik6/mediconnect",

    },
    {
        id: 3,
        type:'professional',
        tech:"react",
        title: "News",
        description: "Design and developed an Admin pannel of Ecommerce site where we easily manages oprders and users and purchase/sales book",
        icon:"ri-reactjs-fill",
        img:LennoEcom,
        hostedLink:"https://https://ecomm.admin.lennobyte.com/",

    },
    {
        id: 4,
        type:'professional',
        tech:"react",
        title: "News",
        description: "Design and developed an Admin pannel of News Portal where we easily manages posts and users and advertisement",
        icon:"ri-reactjs-fill",
        img:LennoNews,
        hostedLink:"https://newsportal.admin.lennobyte.com/",

    }
];

export {Projects}