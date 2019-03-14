import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Northwind',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Menu',
    icon: 'nb-grid-a',
    children: [
      {
        title: 'Crear Cliente',
        link: '/pages/components/usuarios',
      },
      {
        title: 'Clientes',
        link: '/pages/components/pacientes',
      },
      {
        title: 'Pedidos',
        link: '/pages/components/pedidos',
      },
      {
        title: 'Crear Pedido',
        link: '/pages/components/crearPedido',
      }
    ]
  }
];
