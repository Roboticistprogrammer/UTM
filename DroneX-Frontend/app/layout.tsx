import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: 'DroneX Dashboard',
  description: 'Drone delivery management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
