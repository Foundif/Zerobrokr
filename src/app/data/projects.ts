import { StaticImageData } from 'next/image';
import project1main from '@/assets/project1-main.jpeg';
import project1 from '@/assets/project1.jpeg';
import project2main from '@/assets/project2-main.jpeg';
import project2_1 from '@/assets/project2-1.jpeg';
import project2_2 from '@/assets/project2-2.jpeg';
import project2_3 from '@/assets/project2-3.jpeg';
import project2_4 from '@/assets/project2-4.jpeg';
import project3main from '@/assets/project3-main.jpeg';
import project3_1 from '@/assets/project3-1.jpeg';
import project3_2 from '@/assets/project3-2.jpeg';
import project4main from '@/assets/project4-main.jpeg';
import project4_1 from '@/assets/project4-1.jpeg';
import project4_2 from '@/assets/project4-2.jpeg';
import project5main from '@/assets/project5-main.jpeg';
import property5_1 from '@/assets/property5-1.jpeg';
import property5_2 from '@/assets/property5-2.jpeg';
import property5_3 from '@/assets/property5-3.jpeg';
import property5_4 from '@/assets/property5-4.jpeg';
import property5_5 from '@/assets/property5-5.jpeg';
import property5_6 from '@/assets/property5-6.jpeg';
import property5_7 from '@/assets/property5-7.jpeg';
import property5_8 from '@/assets/property5-8.jpeg';
import property5_9 from '@/assets/property5-9.jpeg';
import property5_10 from '@/assets/property5-10.jpeg';
import property5_11 from '@/assets/property5-11.jpeg';

export type Project = {
    id: number;
    images: (string | StaticImageData)[];
    location: string;
    landArea: string;
    buildingArea: string;
    facing: string;
    price: string;
};

export const staticProjectsData: Project[] = [
    {
      id: 1,
      images: [project1main, project1],
      location: 'Madurai – Kadachanendhal',
      landArea: '2.75 Cents',
      buildingArea: '1050 Sq.ft',
      facing: 'South Facing',
      price: '₹57 Lakhs',
    },
    {
      id: 2,
      images: [project2main, project2_1, project2_2, project2_3, project2_4],
      location: 'Madurai – Suriyanagar',
      landArea: '3.25 Cents',
      buildingArea: '1600 Sq.ft',
      facing: 'East Facing',
      price: '₹80 Lakhs',
    },
    {
      id: 3,
      images: [project3main, project3_1, project3_2],
      location: 'Madurai – Kadachanendhal',
      landArea: '2 Cents',
      buildingArea: '1175 Sq.ft',
      facing: 'North Facing',
      price: '₹61 Lakhs',
    },
    {
      id: 4,
      images: [project4main, project4_1, project4_2],
      location: 'Madurai – Kadachanendhal',
      landArea: '2.4 Cents',
      buildingArea: '750 Sq.ft',
      facing: 'East Facing',
      price: '₹47 Lakhs',
    },
    {
      id: 5,
      images: [project5main, property5_1, property5_2, property5_3, property5_4, property5_5, property5_6, property5_7, property5_8, property5_9, property5_10, property5_11],
      location: 'Madurai – Kadachanendhal',
      landArea: '5 Cents',
      buildingArea: '3250 Sq.ft',
      facing: 'North Facing',
      price: '₹2.30 Crore',
    },
];
