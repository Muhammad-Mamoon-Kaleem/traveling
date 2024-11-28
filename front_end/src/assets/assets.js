import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import travelHeader from './travel_header.png'
import travel_logo from './tlogo.png'
import luxurytravels from './luxurytravels.jpeg'
import sportsTravel from './sports.jpeg'
import adventuretravel from './adventuretravel.jpeg'
import photographyTours from './photographyTours.jpeg'
import beachisland from './beachisland.jpg'
import mountsky from './mountsky.jpg'
import paris from './Paris.jpg'
import japan from './japan.jpg'
import Maldives from './Maldives.jpg'
import Mongolia from './Mongolia.jpg'
import muree from './muree.jpg'
import Picchu from './Picchu.jpg'
import Thailand from './thiland.jpg'
import Zermatt from './Zermatt.jpg'
import azadkashmir from './azadkashmir1.jpg'
import bali from './balli.jpg'
import dubai from './dubai.jpg'
import everst from './everst.jpg'
import greatwall from './grtwall.jpg'
import hunza from './hunza.jpg'
import place from './place.png'
import place2 from './place2.png'
import booking from './booking.png'
import list_icon from './listicon.png'
import users from './users.png'
import ali from './ali.jpg'
import hammad from './hammad.jpg'
import waqas from './waqas.jpg'
import redlogo from './rdlogo.png'
import yellowlogo from './y-logo.png'
import yellowlogo2 from './yellowlogo2.png'
export const assets = {
    appointment_img,
    redlogo,
    yellowlogo,
    yellowlogo2,
    ali,
    hammad,
    waqas,
    place,
    list_icon,
    place2,
    booking,
    users,
    paris,
    japan,
    Maldives,
    Mongolia,
    hunza,
    muree,
    Picchu,
    Thailand,
    Zermatt,
    azadkashmir,
    bali,
    dubai,
    everst,
    greatwall,
    mountsky,
    beachisland,
    photographyTours,
    adventuretravel,
    luxurytravels,
    header_img,
    travel_logo,
    sportsTravel,
    group_profiles,
    logo,
    chats_icon,
    travelHeader,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Sports Travel',
        image: sportsTravel
    },
    {
        speciality: 'Photography Tours',
        image: photographyTours
    },
    {
        speciality: 'Luxury Travel',
        image: luxurytravels
    },
    {
        speciality: 'Adventure Travel',
        image: adventuretravel
    },
    {
        speciality: 'Beach & Island',
        image: beachisland
    },
    {
        speciality: 'Mountain and Ski',
        image: mountsky
    },
]

export const places = [
    {
        _id: 'place1',
        name: 'Dubai, UAE',
        image: dubai,
        speciality: 'Sports Travel',
        tourtype: 'Group',
        Tour_duration: '14 days',
        about: 'Discover thrilling sports in Dubai, featuring world-class golf, yacht racing, and exciting desert adventures.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place2',
        name: 'Hunza Valley',
        image: hunza,
        speciality: 'Adventure Travel',
        tourtype: 'Group',
        Tour_duration: '3 days',
        about: 'Hunza Valley is an adventure haven, offering trekking, rock climbing, and stunning mountain views in the Karakoram range.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place3',
        name: 'Azad Kashmir',
        image: azadkashmir,
        speciality: 'Mountain and Ski',
        tourtype: 'Group',
        Tour_duration: '7 days',
        about: 'Azad Kashmir offers thrilling mountain and ski adventures with snow-capped peaks, pristine slopes, and breathtaking alpine scenery.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place4',
        name: 'Bali',
        image: bali,
        speciality: 'Luxury Travel',
        tourtype: 'Couples',
        Tour_duration: '15 days',
        about: 'Experience luxury in Bali with private villas, serene beachfront resorts, world-class spas, and exclusive cultural experiences.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place5',
        name: 'Maldives',
        image: Maldives,
        speciality: 'Beach & Island',
        tourtype: 'Couples',
        Tour_duration: '20 days',
        about: 'The Maldives offers a tropical paradise with crystal-clear waters, pristine white-sand beaches, and luxurious overwater villas.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place6',
        name: 'Thailand',
        image:Thailand,
        speciality: 'Luxury Travel',
        tourtype: 'Group',
        Tour_duration: '14 days',
        about: 'Thailand offers a luxurious escape with stunning beachfront resorts, world-class dining, and vibrant cultural experiences amid breathtaking landscapes.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place7',
        name: 'Great Wall of China',
        image: greatwall,
        speciality: 'Adventure Travel',
        tourtype: 'Group',
        Tour_duration: '7 days',
        about: 'One of the most iconic landmarks, stretching across northern China, offering breathtaking views and rich history.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place8',
        name: 'Machu Picchu, Peru',
        image: Picchu,
        speciality: 'Photography Tours',
        tourtype: 'Couple',
        Tour_duration: '21 days',
        about: 'An iconic archaeological site set against the backdrop of the Andes, perfect for capturing ancient ruins and breathtaking views.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place9',
        name: 'muree',
        image: muree,
        speciality: 'Photography Tours',
        tourtype: 'Group',
        Tour_duration: '4 days',
        about: 'Muree offers stunning photography opportunities with its ancient Juniper forests, scenic landscapes, and historic Residency.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place10',
        name: 'Jeju Island',
        image: doc10,
        speciality: 'Beach & Island',
        tourtype: 'Couple',
        Tour_duration: '21 days',
        about: 'Known for its volcanic landscapes, beautiful beaches, and rich natural beauty, perfect for outdoor activities.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place11',
        name: 'Altai Mountains, Mongolia',
        image: Mongolia,
        speciality: 'Mountain and Ski',
        tourtype: 'Group',
        Tour_duration: '7 days',
        about: 'Offers stunning landscapes, rich wildlife, and unique cultural experiences, ideal for adventure and exploration.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place12',
        name: 'Tokyo, Japan',
        image: japan,
        speciality: 'Sports Travel',
        tourtype: 'Group',
        Tour_duration: '14 days',
        about: 'A hub for various sports, known for hosting the 2020 Summer Olympics and having world-class venues like the Tokyo Dome.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place13',
        name: 'Mount Everest',
        image: everst,
        speciality: 'Adventure Travel',
        tourtype: 'Group',
        Tour_duration: '21 days',
        about: 'Mount Everest, the highest peak in the world, stands at 8,848.86 meters, above sea level and is located in the Himalayas on the border between Nepal and the Tibet Autonomous Region of China.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place14',
        name: 'Zermatt, Switzerland',
        image: Zermatt,
        speciality: 'Mountain and Ski',
        tourtype: 'Couple',
        Tour_duration: '14 days',
        about: 'Famous for its skiing, stunning views of the Matterhorn, and charming village atmosphere.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'place15',
        name: 'Paris, France',
        image: paris,
        speciality: 'Luxury Travel',
        tourtype: 'Couple',
        Tour_duration: '7 days',
        about: 'Known as the city of love and luxury, featuring high-end shopping on the Champs-Élysées and exquisite dining experiences.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]