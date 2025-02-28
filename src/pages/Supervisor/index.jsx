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
  SnippetsOutlined,
  SunFilled,
  UserOutlined,
} from "@ant-design/icons";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge } from "@mui/material";
import {
  Button,
  ConfigProvider,
  Drawer,
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
import Language from "../../components/Language";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../../redux/actions/themeType";
import DashboardSupervisor from "../DashboardSupervisor";
import InformationsSupervisor from "../InformationsSupervisor";
import ApplicationsSupervisor from "../ApplicationsSupervisor";
import StationsSupervisor from "../StationsSupervisor";
import UsersSupervisor from "../UsersSupervisor";
import NotificationsSupervisor from "../NotificationsSupervisor";
import SettingsSupervisor from "../SettingsSupervisor";
import imageNotification from "../../assets/notification.svg";
import imageProfile from "../../assets/profile.svg";
import {
  getAllNotifications,
  getCountNotification,
  getIsReadNotifications,
  getUserInformationById,
} from "../../redux/actions/dashboard";
import UserInformationNotification from "../../components/UserInformationNotification";
import messageRead from "../../assets/email-read.png";
import messageNotRead from "../../assets/email-not-read.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ru"; // Ruscha
import "dayjs/locale/en"; // Inglizcha
import "dayjs/locale/uz"; // O‘zbek (kirill)
import CommandHistorySupervisor from "../CommandHistorySupervisor";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// O‘zbek lotincha tarjima (qo‘lda)
dayjs.updateLocale("uz", {
  relativeTime: {
    future: "%s dan keyin",
    past: "%s oldin",
    s: "bir necha soniya",
    m: "bir daqiqa",
    mm: "%d daqiqa",
    h: "bir soat",
    hh: "%d soat",
    d: "bir kun",
    dd: "%d kun",
    M: "bir oy",
    MM: "%d oy",
    y: "bir yil",
    yy: "%d yil",
  },
});

const Supervisor = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = themes.useToken();
  const { colors, theme } = useSelector((state) => state.theme);
  const {
    countNotification,
    updatedUserInformationById,
    allIsReadNotifications,
  } = useSelector((state) => state.dashboard);
  const [selectedKey, setSelectedKey] = useState("home");
  const handleToggleTheme = () => dispatch(toggleTheme());
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const role = window.localStorage.getItem("role");
  const accessToken = window.localStorage.getItem("access_token");
  const items = [
    {
      key: "home",
      icon: <HomeOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor">
          {t("layoutData.navLink1")}
        </Link>
      ),
    },
    {
      key: "informations",
      icon: <ExceptionOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor/informations">
          {t("layoutData.navLink2")}
        </Link>
      ),
    },
    {
      key: "applications",
      icon: <SnippetsOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor/applications">
          {t("layoutData.navLink3")}
        </Link>
      ),
    },
    {
      key: "commandHistory",
      icon: <HistoryOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor/commandHistory">
          {t("layoutData.navLink8")}
        </Link>
      ),
    },
    {
      key: "stations",
      icon: <DesktopOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor/stations">
          {t("layoutData.navLink4")}
        </Link>
      ),
    },
    {
      key: "users",
      icon: <UserOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor/users">
          {t("layoutData.navLink5")}
        </Link>
      ),
    },
    {
      key: "notifications",
      icon: <BellOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor/notifications">
          {t("layoutData.navLink6")}
        </Link>
      ),
    },
    {
      key: "settings",
      icon: <SettingOutlined style={{ fontSize: "20px" }} />,
      label: (
        <Link className="layout_links" to="/supervisor/settings">
          {t("layoutData.navLink7")}
        </Link>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!accessToken || role != "supervisor") {
      navigate("/not-found");
    }
  }, []);

  useEffect(() => {
    dispatch(getUserInformationById(userId, lang));
  }, [updatedUserInformationById]);

  useEffect(() => {
    dispatch(getCountNotification(lang));
    dispatch(getIsReadNotifications(lang));
    dispatch(getAllNotifications(lang));
  }, []);

  function timeAgo(dateString, lan) {
    dayjs.locale(lan);
    return dayjs(dateString).fromNow();
  }

  return (
    <Layout>
      <Drawer title={t("layoutData.navLink6")} onClose={onClose} open={open}>
        <ul className="m-0 p-0 list-unstyled notification-wrapper-is-read mb-3">
          {allIsReadNotifications?.map((e, i) => {
            return (
              <li
                className="notification-wrapper-item d-flex  cursor-pointer"
                key={i}
                onClick={() => {
                  navigate(`/${role}/notifications/${e.id}`);
                  onClose();
                }}
              >
                <div className="d-flex">
                  <img
                    className="mt-2"
                    src={imageNotification}
                    alt="messageRead"
                    width={28}
                    height={28}
                  />
                </div>
                <div className="ms-4">
                  <p className="m-0">stansiyadan kelgan xabar</p>
                  <p className="notification-wrapper-item-time m-0 mt-2">
                    {timeAgo(e?.createdAt, lang)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Drawer>

      <Sider
        style={{ minHeight: "100vh", background: colors.layoutBackground }}
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
            items={items}
          />
        </ConfigProvider>
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

          <div
            className="header_badge_notif_container d-flex justify-content-center align-items-center ms-auto me-3"
            onClick={showDrawer}
          >
            <Badge
              className="notification-message cursor-pointer"
              color="error"
              badgeContent={countNotification}
              type="button"
              onClick={showDrawer}
            >
              <NotificationsNoneIcon />
            </Badge>
          </div>

          <div className="d-flex justify-content-center align-items-center me-4">
            <img src={imageProfile} alt="imageProfile" width={25} height={25} />
            <p className="m-0 ms-1">{role}</p>
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
            <Route path="/commandHistory" element={<CommandHistorySupervisor />} />
            <Route path="/stations" element={<StationsSupervisor />} />
            <Route path="/users" element={<UsersSupervisor />} />
            <Route
              path="/notifications"
              element={<NotificationsSupervisor />}
            />
            <Route
              path="/notifications/:id"
              element={<UserInformationNotification />}
            />
            <Route path="/settings/*" element={<SettingsSupervisor />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Supervisor;
