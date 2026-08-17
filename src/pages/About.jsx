import "../styles/About.css";

const features = [
    {
        title: "CRUD",
        description: "Create, update and delete users"
    },
    {
        title: "Search",
        description: "Find users by name or email"
    },
    {
        title: "Pagination",
        description: "Browse users across multiple pages"
    },
    {
        title: "Validation",
        description: "Form validation with Yup and React Hook Form"
    },
    {
        title: "Authentication",
        description: "Login, logout and protected routes"
    },
    {
        title: "Custom Hook",
        description: "API operations handled with a reusable custom hook"
    }
];

const About = () => {
    return (
        <div className="about-page">

            <div className="about-card">

                <span className="about-badge">
                    React Project
                </span>

                <h1>
                    User Management
                </h1>

                <p>
                    A modern user management dashboard built with React,
                    featuring CRUD operations, validation, search,
                    pagination and authentication.
                </p>

                <div className="about-features">

                    {features.map((feature) => (
                        <div key={feature.title}>
                            <strong>
                                {feature.title}
                            </strong>

                            <span>
                                {feature.description}
                            </span>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default About;