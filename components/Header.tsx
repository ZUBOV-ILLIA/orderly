import TopMenu from "@/components/TopMenu";
import { List } from "react-bootstrap-icons";
import "@/styles/_header.scss";

export default function Header() {
  return (
    <header className="header w-100 shadow-lg z-2">
      <div className="container-xxl h-100 d-flex align-items-center justify-content-between">
        <div
          className="p-2 header__burger-btn rounded-3 animate__animated animate__rubberBand"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#sideNavBody"
          aria-expanded="true"
          aria-controls="sideNavBody"
          aria-label="nav menu burger btn"
        >
          <List size={32} />
        </div>

        <TopMenu />
      </div>
    </header>
  );
}
