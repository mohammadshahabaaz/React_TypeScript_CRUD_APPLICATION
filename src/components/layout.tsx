import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Resources } from './Resources';
import '../css/layout.css';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export const SiderDemo: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('1');

  const toggle = () => setCollapsed(!collapsed);

  const items = [
    {
        key: '0',
        // icon: <UserOutlined />,
        label: 'Application Dashboard',
        // onClick: () => setActiveNav('1'),
      },
      {
        key: '0',
        // icon: <UserOutlined />,
        // label: 'Application Dashboard',
        // onClick: () => setActiveNav('1'),
      },
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Manage Applications',
      onClick: () => setActiveNav('1'),
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Nav 2',
      onClick: () => setActiveNav('2'),
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Nav 3',
      onClick: () => setActiveNav('3'),
    },
  ];

  return (
    <Layout className='fullHeightLayout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items} // Updated to use `items` prop
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Title level={2} className='trigger' onClick={toggle}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} Manage Applications
          </Title>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 'auto',
          }}
        >
          {activeNav === '1' && <Resources />}
          {/* You can add conditional rendering for other components based on activeNav */}
        </Content>
      </Layout>
    </Layout>
  );
};
















// import React from 'react';
// import { Layout, Menu } from 'antd';
// import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import { Resources } from './Resources';


// import '../css/layout.css'

// import { Typography } from 'antd';

// const { Title } = Typography;


// const { Header, Sider, Content } = Layout;

// interface State {
//   collapsed: boolean;
//   activeMenuKey: string; // Manage active menu item
// }

// export class SiderDemo extends React.Component<{}, State> {
//   state: State = {
//     collapsed: false,
//     activeMenuKey: '1', // Default to '1' or another value based on your initial active menu item
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   render() {
//     return (
//       <Layout className='fullHeightLayout' >
//         <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
//           <div className="logo" />
//           <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//             <Menu.Item key="1" icon={<UserOutlined />} >
//               nav 1
//             </Menu.Item>
//             <Menu.Item key="2" icon={<VideoCameraOutlined />}>
//               nav 2
//             </Menu.Item>
//             <Menu.Item key="3" icon={<UploadOutlined />}>
//               nav 3
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
        
//           <Header style={{ background: '#fff', padding: 0 }}>
//           <Title level={2}> {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//               className: 'trigger',
//               onMouseLeave: this.toggle,
//             })} Manage Applications</Title>
            
//           </Header>
//           <Content
//             style={{
//               margin: '24px 16px',
//               padding: 24,
//               background: '#fff',
//               minHeight: 'auto',
//             }}
//           >
//            <Resources/>
//           </Content>
//         </Layout>
//       </Layout>
//     );
//   }
// }
