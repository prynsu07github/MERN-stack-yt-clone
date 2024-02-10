import React from "react";
import { Link } from "react-router-dom";
import { InstagramLogo, FacebookLogo, TwitterLogo } from "phosphor-react";

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer">
      <div>© {year} All Copyrights Reserved</div>
      <div className="socials">
       <div>
       <Link>
          <InstagramLogo size={32} />
        </Link>
       </div>
        <div>
        <Link>
          <FacebookLogo size={32} />
        </Link>
        </div>
        <div>
        <Link>
          <TwitterLogo size={32} />
        </Link>
        </div>
      </div>
    </div>
  );
};
