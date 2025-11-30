export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  image: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      "EstateOpus made our dream a reality. Their professionalism and dedication were outstanding throughout the entire process. We couldn't be happier with our new home!",
    name: 'The Johnson Family',
    title: 'New Homeowners',
    image: 'testimonial-2',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'The team at EstateOpus is top-notch. They listened to our needs and found the perfect investment property for us. Highly recommended for their market expertise.',
    name: 'David Lee',
    title: 'Property Investor',
    image: 'testimonial-1',
    rating: 5,
  },
  {
    id: '3',
    quote:
      "Selling our house was seamless thanks to EstateOpus. Their marketing strategy was brilliant, and they secured a great price for us faster than we expected.",
    name: 'Sarah Williams',
    title: 'Former Homeowner',
    image: 'testimonial-3',
    rating: 5,
  },
];
