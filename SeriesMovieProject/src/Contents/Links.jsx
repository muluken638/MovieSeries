
import { BiHeart, BiLock, BiMovie, BiSolidDashboard } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { CgUserList, CgViewList } from 'react-icons/cg'
import { FaListAlt } from 'react-icons/fa'
import { FcAbout } from 'react-icons/fc'
import { GrContact } from 'react-icons/gr'
import { MdLocalMovies, MdMovie, MdRecommend, MdUpdate } from 'react-icons/md'
import { RiMovie2Fill } from 'react-icons/ri'
import { TbVideo } from 'react-icons/tb'

 export const SidebarLinks = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: BiSolidDashboard
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: BsPerson
    }, {
        name: 'Password',
        link: '/password',
        icon: BiLock
    }, {
        name: 'User List',
        link: '/userlist',
        icon: CgUserList
    }, {
        name: 'Add Movie',
        link: '/api/casts',
        icon: RiMovie2Fill
    }, {
        name: 'Movie List',
        link: '/api/filmslist',
        icon: FaListAlt
    }, {
        name: 'Favorite Movies',
        link: '/favorite',
        icon: BiHeart
    }, {
        name: 'Update Profile',
        link: '/updateprofile',
        icon: MdUpdate
    }
]   
export const NavbarLinks = [
    {
        name: 'Films',
        link: '/api/films',
        icon: MdMovie
    },  {
        name: 'TV',
        link: '/tv',
        icon: TbVideo,
    },  {
        name: 'Series',
        link: '/api/seriesPage',
        icon: MdLocalMovies
    },
    {
        name: 'About',
        link: '/About',
        icon: FcAbout
    },  {
        name: 'Contact',
        link: '/contact',
        icon: GrContact,
    },
]
export const CardLinks = [
    {
        name: 'Total Films',
        total: '',
        iconName: BiHeart
    },
    {
        name: 'Total Series',
        total: '',
        iconName: CgViewList
    },
    {
        name: 'Total Seasons',
        total: '',
        iconName: BiMovie
    },]
// other Links are avialable here for the statical data 

