document.addEventListener('DOMContentLoaded', function() {
    const projectGrid = document.querySelector('.project-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Project data with links to individual pages
    const projects = [
        {
            title: "Kubernetes and Amazon EKS Project",
            description: "Set up and hosted a dynamic web application using Kubernetes and Amazon EKS, deepening my understanding of container orchestration.",
            image: "images/EKS-project/EKS Cluster.jpg",
            tags: ["Kubernetes", "Amazon EKS", "Docker", "AWS ECR"],
            category: "aws",
            link: "project-EKS-Kubernetes.html"
        },
        {
            title: "Dynamic Website Deployment and Hosting on AWS",
            description: "Established a secure, isolated section of the AWS cloud for networking.",
            image: "images/3TierArchitecture.jpg",
            tags: ["AWS", "VPC", "EC2"],
            category: "aws",
            link: "project-aws-deployment.html"
        },
        {
            title: "Currency Normalization Project",
            description: "Developed a system to normalize property sales data, converting prices from different currencies to USD.",
            image: "images/Screenshot 2024-07-18 at 12.45.57 AM.png",
            tags: ["AWS Lambda", "DynamoDB", "S3"],
            category: "data-science",
            link: "project-currency-normalization.html"
        },
        {
            title: "Astronomy Picture of the Day (APOD) Project",
            description: "Web application allowing users to explore NASA's Astronomy Picture of the Day from any date.",
            image: "images/Screenshot 2024-08-02 at 12.38.18 AM.png",
            tags: ["Web Dev", "AWS S3", "API Gateway", "Lambda"],
            category: "web-dev",
            link: "project-apod.html"
        },
        {
            title: "Image Recognition App Project",
            description: "Developed a backend for an Image Recognition App leveraging AWS services for seamless and accurate image analysis.",
            image: "images/1_0W3bY_v4cor_SC-rx0rA3A.png",
            tags: ["AWS Lambda", "Amazon S3", "Amazon Rekognition", "DynamoDB"],
            category: "web-dev",
            link: "project-apod.html"
        },
        {
            title: "Real-time Weather Dashboard",
            description: "Developed a serverless weather dashboard application using AWS SAM, providing current weather and 5-day forecasts based on user location.",
            image: "images/samweather.jpeg",
            tags: ["AWS SAM", "Lambda", "API Gateway", "S3", "Serverless"],
            category: "aws",
            link: "project-weather-dashboard.html"
        },
        {
            title: "Magic 8 Ball Serverless Application",
            description: "Developed a fun and interactive Magic 8 Ball application using AWS Serverless Application Model (SAM), demonstrating the power of serverless architecture.",
            image: "images/Screenshot 2024-08-21 at 1.25.50 AM.png",
            tags: ["AWS SAM", "Lambda", "API Gateway", "S3", "Serverless"],
            category: "aws",
            link: "project-magic-8-ball.html"
        },
        {
            title: "Highly Available Static Website Using Ansible & AWS",
            description: "Built a highly available static website architecture using Ansible for automation and AWS services for infrastructure.",
            image: "images/Static Website with Ansible.jpg",
            tags: ["Ansible", "AWS VPC", "Application Load Balancer", "NAT Gateway", "Bastion Host", "Route 53", "Automation"],
            category: "aws",
            link: "project-ansible-aws.html"
        },
        {
            title: "AI Image Generation Service using Amazon Bedrock & Stable Diffusion",
            description: "Created an AI image generation service using AWS ECS Fargate, API Gateway, Lambda, and Amazon Bedrock’s Stable Diffusion model, with scalable cloud infrastructure.",
            image: "images/ai-image-generation-with-docker.jpg",
            tags: ["Amazon Bedrock", "Stable Diffusion", "AWS Lambda", "ECS Fargate", "API Gateway", "S3", "Docker", "CI/CD"],
            category: "aws",
            link: "project-ai-image-generation.html"
        },
        {
            title: "WordPress Website Hosted on AWS",
            description: "Built a scalable, fault-tolerant WordPress website leveraging AWS services such as EC2, ALB, EFS, and RDS to provide a secure, high-availability solution.",
            image: "images/wordpressonaws.jpeg",
            tags: ["AWS EC2", "Application Load Balancer", "NAT Gateway", "Amazon RDS", "Elastic File System", "VPC", "Route 53"],
            category: "aws",
            link: "project-wordpress-aws.html"
        },
        {
            title: "Cloud-Based Architecture with Video Demonstration",
            description: "Designed a scalable cloud-based architecture and created a video demonstration showcasing its setup and functionality using AWS services.",
            image: "images/galactic.png",
            tags: ["AWS", "Cloud Architecture", "Video Demonstration", "Scalability"],
            category: "aws",
            link: "project-cloud-architecture-video.html"
        },
        {
            title: "AI-Powered Web Application with Amazon Bedrock & ECS Fargate",
            description: "Developed, containerized, and deployed an AI-powered web app using Amazon Bedrock, leveraging AWS ECS Fargate and a CI/CD pipeline for automation.",
            image: "images/AI Image Desc. App.jpg",
            tags: ["Amazon Bedrock", "ECS Fargate", "CI/CD", "Docker", "AI", "Anthropic’s Claude 3 Haiku"],
            category: "aws",
            link: "project-ai-powered-app.html"
        },
        {
            title: "Recommendation System using Collaborative Filtering",
            description: "Built a recommendation system using collaborative filtering and Singular Value Decomposition (SVD) techniques to personalize product recommendations.",
            image: "images/recomm1.jpeg",
            tags: ["Data Science", "Machine Learning", "Python", "Collaborative Filtering", "SVD", "Surprise Library"],
            category: "data-science",
            link: "project-recommendation-system.html"
        },
        {
            title: "Serverless Image Recognition Pipeline",
            description: "Built an automated image recognition pipeline using Amazon Rekognition, S3, Lambda, and DynamoDB to detect objects, text, and celebrities in images.",
            image: "images/Smart Analyzer.jpeg",
            tags: ["AWS Lambda", "Amazon Rekognition", "DynamoDB", "API Gateway", "S3", "CloudFront"],
            category: "aws",
            link: "project-image-recognition.html"
        }


        // Add more projects here
    ];

    // Function to create project cards
    function createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}">
                <div class="content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="project-link">View Project Details</a>
                </div>
            </div>
        `;
    }

    // Initial load of all projects
    projectGrid.innerHTML = projects.map(createProjectCard).join('');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projectGrid.innerHTML = projects
                .filter(project => filter === 'all' || project.category === filter)
                .map(createProjectCard)
                .join('');
        });
    });
});