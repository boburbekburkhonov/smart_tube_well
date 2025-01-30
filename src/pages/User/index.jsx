import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import './index.css'
import { useSelector } from 'react-redux';

const User = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { colors } = useSelector(
    (state) => state.theme
  );
  const [selectedKey, setSelectedKey] = useState("home");

  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
        style={{minHeight: '100vh', background: colors.layoutBackground, paddingTop:'50px'}}
        onClick={(e) => setSelectedKey(e.key)}
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
        >
          <Menu.Item
            key="home"
            icon={<UserOutlined />}
            style={selectedKey === "home" ? { background: colors.isActiveBackground, color: colors.isActiveColor } : {}}
          >
            Bosh sahifa
          </Menu.Item>
          <Menu.Item
            key="information"
            icon={<VideoCameraOutlined />}
            style={selectedKey === "information" ? { background: colors.isActiveBackground, color: colors.isActiveColor } : {}}
          >
            Ma'lumot
          </Menu.Item>
          <Menu.Item
          color='white'
            key="application"
            icon={<VideoCameraOutlined />}
            style={selectedKey === "application" ? { background: colors.isActiveBackground, color: colors.isActiveColor } : {}}
          >
            Talabnoma
          </Menu.Item>
          <Menu.Item
            key="stations"
            icon={<VideoCameraOutlined />}
            style={selectedKey === "stations" ? { background: colors.isActiveBackground, color: colors.isActiveColor } : {}}
          >
            Stansiyalar
          </Menu.Item>
          <Menu.Item
            key="users"
            icon={<VideoCameraOutlined />}
            style={selectedKey === "users" ? { background: colors.isActiveBackground, color: colors.isActiveColor } : {}}
          >
            Foydalanuvchilar
          </Menu.Item>
          <Menu.Item
            key="notifications"
            icon={<VideoCameraOutlined />}
            style={selectedKey === "notifications" ? { background: colors.isActiveBackground, color: colors.isActiveColor } : {}}
          >
            Bildirishnomalar
          </Menu.Item>
          <Menu.Item
            key="settings"
            icon={<VideoCameraOutlined />}
            style={selectedKey === "settings" ? { background: colors.isActiveBackground, color: colors.isActiveColor } : {}}
          >
            Sozlamalar
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default User;