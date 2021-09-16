import React from 'react';
import { MdAssignment } from 'react-icons/md'
import { BsChatDots } from 'react-icons/bs'
import { SiMicrosoftteams } from 'react-icons/si'

export const SidebarData = [
  {
    title: 'Chat',
    path: '/chat',
    icon: <BsChatDots />,
    cName: 'nav-text'
  },
  {
    title: 'Teams',
    path: '/',
    icon: <SiMicrosoftteams />,
    cName: 'nav-text'
  },
  {
    title: 'Assignments',
    path: '/assignments',
    icon: <MdAssignment />,
    cName: 'nav-text'
  }
];