import React, { useCallback, useEffect, useMemo, useState } from "react";
import Icon, {
  BellOutlined,
  DesktopOutlined,
  ExceptionOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonFilled,
  SettingOutlined,
  SunFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  ConfigProvider,
  Layout,
  Menu,
  theme as themes,
} from "antd";
const { Header, Sider, Content } = Layout;
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/app_logo_white.png";
import logout from "../../assets/logout.png";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import DashboardSupervisor from "../DashboardSupervisor";
import InformationsSupervisor from "../InformationsSupervisor";
import ApplicationsSupervisor from "../ApplicationsSupervisor";
import StationsSupervisor from "../StationsSupervisor";
import UsersSupervisor from "../UsersSupervisor";
import NotificationsSupervisor from "../NotificationsSupervisor";
import SettingsSupervisor from "../SettingsSupervisor";
import Language from "../../components/Language";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../../redux/actions/themeType";
import NotFoundPage from "../NotFoundPage";

const Supervisor = () => {
  const { i18n, t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = themes.useToken();
  const { colors, theme } = useSelector((state) => state.theme);
  const [selectedKey, setSelectedKey] = useState("home");
  const handleToggleTheme = () => dispatch(toggleTheme());
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("access_token");

  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: (
        <Link className="layout_links" to="/supervisor">
          {t("layoutData.navLink1")}
        </Link>
      ),
    },
    {
      key: "informations",
      icon: <ExceptionOutlined />,
      label: (
        <Link className="layout_links" to="/supervisor/informations">
          {t("layoutData.navLink2")}
        </Link>
      ),
    },
    {
      key: "applications",
      icon: <HistoryOutlined />,
      label: (
        <Link className="layout_links" to="/supervisor/applications">
          {t("layoutData.navLink3")}
        </Link>
      ),
    },
    {
      key: "stations",
      icon: <DesktopOutlined />,
      label: (
        <Link className="layout_links" to="/supervisor/stations">
          {t("layoutData.navLink4")}
        </Link>
      ),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: (
        <Link className="layout_links" to="/supervisor/users">
          {t("layoutData.navLink5")}
        </Link>
      ),
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: (
        <Link className="layout_links" to="/supervisor/notifications">
          {t("layoutData.navLink6")}
        </Link>
      ),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: (
        <Link className="layout_links" to="/supervisor/settings">
          {t("layoutData.navLink7")}
        </Link>
      ),
    },
  ];

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/not-found");
  //   }
  // }, []);

  function logoutFunction() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("roles");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    window.localStorage.removeItem("regionId");
    window.localStorage.removeItem("districtId");
    window.localStorage.removeItem("userId");
    window.location.reload();
  }
  const memo = useCallback(() => {
    return 'Hello'
  })

  console.log(memo());

  return (
    <Layout>
      <Sider
        style={{ height: "100vh", background: colors.layoutBackground }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
      >
        <div className="demo-logo-vertical">
          <img
            src={logo}
            alt="logo"
            width={40}
            height={40}
            style={{ filter: "invert(1) brightness(10)" }}
          />
          {!collapsed && (
            <p
              className="demo-logo-vertical-desc m-0"
              style={{ color: colors.text }}
            >
              Smart Tube Well
            </p>
          )}
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: colors.text,
                itemSelectedBg: colors.isActiveBackground, // Background color when selected
                itemSelectedColor: colors.isActiveColor, // Text color when selected
                itemHoverBg: colors.isActiveBackground, // Background color on hover
                itemHoverColor: colors.isActiveColor, // Text color on hover
              },
            },
          }}
        >
          <Menu
            style={{ background: colors.layoutBackground, paddingTop: "20px" }}
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            items={items} // ✅ Using items array
          />
        </ConfigProvider>

        <div
          className="logout_supervisor_wrapper"
          style={{
            width: "100%",
            padding: "0 5px",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: "20px",
            cursor: "pointer",
            marginLeft: "15px",
          }}
          onClick={logoutFunction}
        >
          <img src={logout} alt="logout" width={20} height={20} />
          {!collapsed && (
            <p
              className="logout_supervisor m-0 ms-1"
              style={{ color: colors.text }}
            >
              {t("layoutData.logOut")}
            </p>
          )}
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex justify-content-between align-items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="d-flex justify-content-between align-items-center">
            <div className="header_badge_container ms-auto">
              <Badge>
                <Button
                  onClick={() => {
                    navigate("/supervisor/notifications");
                    setSelectedKey("notifications");
                  }}
                  style={{
                    background: colors.layoutBackground,
                    color: colors.text,
                  }}
                  type="success"
                  icon={<BellOutlined />}
                />
              </Badge>
            </div>

            <div className="switch-container ms-4">
              <input
                onChange={handleToggleTheme}
                checked={theme === "light"}
                type="checkbox"
                id="switch"
              />
              <label htmlFor="switch">
                <MoonFilled className="fa-moon" />
                <SunFilled className="fa-sun" />
                <span className="ball"></span>
              </label>
            </div>

            <div>
              <Language />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardSupervisor />} />
            <Route path="/informations" element={<InformationsSupervisor />} />
            <Route path="/applications" element={<ApplicationsSupervisor />} />
            <Route path="/stations" element={<StationsSupervisor />} />
            <Route path="/users" element={<UsersSupervisor />} />
            <Route
              path="/notifications"
              element={<NotificationsSupervisor />}
            />
            <Route path="/settings" element={<SettingsSupervisor />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Supervisor;
