import { useState } from "react"; // Import useState hook for managing component state.
import { useNavigate, NavLink } from "react-router-dom"; // Import hooks for navigation.
import { posts } from "../../data/posts"; // Import post data.
import styles from "./Sidebar.module.css"; // Import CSS modules for styling.

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // State variable to track sidebar open/close state.
  const navigate = useNavigate(); // Get navigation function for programmatic routing.

  // Extract unique categories dynamically
  const categories = Array.from(
    new Set(posts.map((post) => post.category)) //creates a new Set which only allows unique values and then converts it back to an array
  );

  // Get the 5 most recent posts sorted by date
  const recentPosts = posts
    .slice() // Create a copy of the posts array to avoid modifying the original.
    .sort((a, b) => new Date(b.date) - new Date(a.date)) //sort in descending order of date
    .slice(0, 5); //take only first 5 elements

  const navItems = [
    //navigation items which needs to be displayed in the sidebar
    { path: "/", label: "Home" },
    { path: "/posts", label: "Blog" },
    { path: "/posts/new", label: "New Post" },
    { path: "/profile", label: "Profile" },
  ];

  const toggleSidebar = () => {
    //function to toggle the sidebar
    setIsOpen((prev) => !prev); // Toggle the isOpen state.
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button //button to open the sidebar
        className={styles.sidebarToggle}
        onClick={toggleSidebar} //call toggleSidebar function when clicked
        aria-label="Toggle Sidebar"
      >
        ☰ {/* Hamburger icon for the toggle button. */}
      </button>
      {/* Sidebar Drawer */}
      <aside //sidebar which slides in when hamburger menu is clicked
        className={`${styles.sidebar} ${isOpen ? styles["sidebar--open"] : ""}`} //conditional styling for sidebar based on isOpen state
      >
        {isOpen && ( // Conditionally render close button when sidebar is open.
          <button
            className={styles.sidebarClose}
            onClick={toggleSidebar} //call toggleSidebar function when clicked
            aria-label="Close Sidebar"
          >
            × {/* Close icon for the close button. */}
          </button>
        )}
        {isOpen && // Conditionally render navigation items when sidebar is open.
          navItems.map(
            (
              item //map through the navItems array and render NavLinks
            ) => (
              <section key={item.path} className={styles.sidebar__section}>
                {" "}
                {/* Container for each navigation item. */}
                <NavLink //NavLink for navigation
                  to={item.path} //path for navigation
                  className={(
                    { isActive } //conditional styling for active link
                  ) =>
                    `${styles.navigation__link} ${
                      isActive ? styles["is-active"] : ""
                    }`
                  }
                >
                  {item.label} {/* Display the label of the navigation item. */}
                </NavLink>
              </section>
            )
          )}

        {/* Categories Section */}
        <section className={styles.sidebar__section}>
          {" "}
          {/*section for categories*/}
          <h3 className={styles.sidebar__title}>Categories</h3>{" "}
          {/*title for categories section*/}
          <ul className={styles.sidebar__list}>
            {" "}
            {/*unordered list to display categories*/}
            {categories.map(
              (
                category //map through categories array and render list item for each category
              ) => (
                <li key={category} className={styles.sidebar__item}>
                  {" "}
                  {/* List item for each category. */}
                  <button //button to filter by category
                    onClick={() => {
                      const slug = category.toLowerCase().replace(/\s+/g, "-"); //create slug from category name by converting to lowercase and replacing spaces with hyphen
                      navigate(`/posts?category=${category}`); //navigate to posts page with category filter query parameter
                      setIsOpen(false); //close the sidebar
                    }}
                    className={styles.sidebar__link} //styling for category link
                  >
                    {category} {/* Display the category name. */}
                  </button>
                </li>
              )
            )}
          </ul>
        </section>

        {/* Recent Posts Section */}
        <section className={styles.sidebar__section}>
          {" "}
          {/* Container for recent posts section. */}
          <h3 className={styles.sidebar__title}>Recent Posts</h3>{" "}
          {/* Heading for recent posts section. */}
          <ul className={styles.sidebar__list}>
            {" "}
            {/* Unordered list for recent posts. */}
            {recentPosts.map(
              (
                post // Map through recentPosts array and render list items.
              ) => (
                <li key={post.id} className={styles.sidebar__item}>
                  {" "}
                  {/* List item for each recent post. */}
                  <button //button to navigate to post details page when clicked
                    onClick={() => {
                      navigate(`/posts/${post.id}`); //navigate to post details page for corresponding post id
                      setIsOpen(false); //close the sidebar
                    }}
                    className={styles.sidebar__link} //styling for the link
                  >
                    {post.title} {/* Display the title of the recent post. */}
                  </button>
                </li>
              )
            )}
          </ul>
        </section>
      </aside>
      {/* Overlay to close sidebar */}
      {isOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}{" "}
      {/* Overlay to close sidebar when clicked. */}
    </>
  );
}

export default Sidebar; //export the sidebar component
