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


## Getting Started

### Prerequisites

* AWS Account 

### Installation

* Create S3 bucket (tech-assessment-bucket-frontend)
   * Upload contents from folder: front
   * Apply Bucket Policy from file: resources/bucket.policy.json
   * Enable Static web hosting
       * Set starting page as main.html
       * Set error page as error.html

* Create S3 bucket (tech-assessment-bucket-backend)
   * Upload contents from folder: resources/requestData.csv
   * Apply Bucket Policy from file: resources/bucket.policy.json

* Create Lambda function (save-request-data)
    * Runtime: Python 3.12
    * Get code from save-request-data.py
    * Deploy function
    * Assign IAM role to access S3 Bucket

* Create Lambda function (get-request-data)
    * Runtime: Python 3.12
    * Get code from get-request-data.py
    * Deploy function
    * Assign IAM role to access S3 Bucket

* Create API Gateway HTTP API
    * Create GET route pointing to get-request-data Lambda function
    * Create POST route pointing to set-request-data Lambda function

## Usage

Use this URL to test http://tech-assessment-bucket-frontend.s3-website-us-east-1.amazonaws.com/

Application displays an interface with dropdown and text inputs:
* 支店/支社: dropdown with 3 options (required)
* SS: dropdown with dynamic options based on 支店/支社 selected option (required)
* 形名(室外): text input with format validation (7-30 characters, alphanumeric and hyphen allowed)
* 設置年度: dropdown with 3 options
* 伝票番号: text input with format validation (6 digits)
* 大項目: dropdown with 3 options
* 中項目: dropdown with dynamic options based on 大項目 selected option
* 小項目: dropdown with dynamic options based on 中項目 selected option

After all required field and validations are fulfilled, 送信／分析 button can be pressed. This prompts a server post which creates a csv file with the data from the fields stored in a format where the timestamp is the name, file is stored in S3 bucket. After this is done, a table is displayed under all the fields. This table is dynamically created by calling an endpoint which retrieves csv data from the server in a json format, the data is sorted and displayed in a percentage format.

<!-- MARKDOWN LINKS & IMAGES -->
[Bootstrap-url]: https://getbootstrap.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

<p align="right">(<a href="#readme-top">back to top</a>)</p>