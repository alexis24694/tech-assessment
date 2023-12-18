<a name="readme-top"></a>

<br />


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Web Application implemented with AWS Services

### Built With

* HTML
* CSS
* JavaScript
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* S3

Front end was build with HTML, CSS and JavaScript and hosted in AWS S3 Bucket. Bucket had the s3:GetObject policy and CORS setup to allow access to specific IP Addresses. In the published site, this was disabled to allow any user to review the website implementation. Bucket Policy implementation can be reviewed in detail in resources/bucket.policy.json

* Lambda
* API Gateway

Backend was build using AWS Services, mainly Lambda functions implemented with Python 3.12, exposed through API Gateway routes.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Use this URL to test http://tech-assessment-bucket-frontend.s3-website-us-east-1.amazonaws.com/


<!-- MARKDOWN LINKS & IMAGES -->
[Bootstrap-url]: https://getbootstrap.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

<p align="right">(<a href="#readme-top">back to top</a>)</p>