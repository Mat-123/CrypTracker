import { Link } from 'react-router-dom';

const ContactEmail = () => {
  return (
    <div className="card mt-5 card-bg-color text-white rounded-4">
      <div className="card-body">
        <h5 className="card-title">Contact Us</h5>
        <p className="card-text">
          If you have any questions or need support, please contact us at:
        </p>
        <Link href="mailto:cryptracker-tool@proton.me" className="btn btn-manage contact-link">cryptracker-tool@proton.me</Link>
      </div>
    </div>
  );
};

export default ContactEmail;
