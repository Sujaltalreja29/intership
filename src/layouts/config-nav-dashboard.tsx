import { SvgColor } from 'src/components/svg-color';


const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: icon('logout'),
  },
];
