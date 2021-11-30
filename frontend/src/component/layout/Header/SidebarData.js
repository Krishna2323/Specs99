import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io'
import * as BsIcons  from 'react-icons/bs';
import * as MdIcons  from 'react-icons/md';



export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: <BsIcons.BsFillCartCheckFill />,
    cName: 'nav-text'
  },

  {
    title: 'Products',
    path: '/products',
    icon: <BsIcons.BsSunglasses />,
    cName: 'nav-text'
  },

  {
    title: 'My Orders',
    path: '/orders',
    icon: <IoIcons.IoIosAlbums />,
    cName: 'nav-text'
  },
  {
    title: 'My Account',
    path: '/account',
    icon: <MdIcons.MdAccountCircle />,
    cName: 'nav-text'
  },

];
