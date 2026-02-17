import type { ReactNode } from "react";
import { Layout } from "antd";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

const { Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <Layout style={{ minHeight: "98vh", background: "#ffffff" }}>
      <Sidebar />
      <Layout style={{ marginLeft: 256 }}>
        <TopBar title={title} description={description} />
        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
