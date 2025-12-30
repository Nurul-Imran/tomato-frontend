import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const Error = () => {
  return (
    <div id="error_page">
      <section className="error_container">
        <div className="error_content">
          {/* 404 Number with Animation */}
          <div className="error_code">
            <span className="digit">4</span>
            <span className="digit rotating">0</span>
            <span className="digit">4</span>
          </div>

          {/* Error Message */}
          <h1 className="error_title">Page Not Found</h1>
          <p className="error_description">
            Sorry, the page you are looking for doesn't exist or has been moved. 
            Let's get you back to delicious food!
          </p>

          {/* Action Buttons */}
          <div className="error_buttons">
            <Link to="/" className="btn btn_primary">
              Back to Home
            </Link>
            <Link to="/foods" className="btn btn_secondary">
              Browse Foods
            </Link>
          </div>

          {/* Decorative Element */}
          <div className="error_decoration">
            <div className="decoration_item">🍕</div>
            <div className="decoration_item">🍔</div>
            <div className="decoration_item">🍟</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Error