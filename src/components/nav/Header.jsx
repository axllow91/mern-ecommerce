import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

export default function Header() {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu>

      <Item key="register" className="float-right" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>

      <Item key="login" className="float-right" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Item>
    </Menu>
  );
}
