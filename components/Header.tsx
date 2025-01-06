import TopMenu from "@/components/TopMenu";
import "@/styles/_header.scss";

export default function Header({
  isUserAuth = false,
}: {
  isUserAuth?: boolean;
}) {
  return (
    <header className="header w-100 shadow-lg z-2">
      <div className="container-xxl h-100 d-flex align-items-center justify-content-end">
        <TopMenu isUserAuth={isUserAuth} />
      </div>
    </header>
  );
}
