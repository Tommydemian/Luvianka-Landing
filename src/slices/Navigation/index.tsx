import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import DropdownItem from "@/components/DropdownItem";

export type NavigationProps = SliceComponentProps<Content.NavigationSlice>;

const Navigation = ({ slice }: NavigationProps): JSX.Element => {
  const navLinks = slice.primary.nav_item;
  const prodList = slice.primary.products;

  return (
    <nav
      className="header-nav"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ul className="header-navlist">
        {navLinks.map(({ label, link, is_product_category }) => (
          <li key={label} className={is_product_category ? "dropdown" : ""}>
            {is_product_category ? (
              <>
                <DropdownItem label={label} link={link} products={prodList} />
              </>
            ) : (
              <PrismicNextLink field={link}>{label}</PrismicNextLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
