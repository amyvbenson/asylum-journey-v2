import "../home/home.css";
import Header from "../home/components/Header";

export default function NotFOund() {
  return (
    <main>
      <Header />
      <div className="home-container home-main">
        <h2>Page not found</h2>
        <a href="./">Go to the home page.</a>
      </div>
    </main>
  );
}
