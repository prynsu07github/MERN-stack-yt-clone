import React from "react";

export const Contact = () => {
  return (
    <div className="contact-us">
      <h1>Contact Us - videoNex</h1>

      <p>
        Have a question, suggestion, or need assistance? Reach out to us using
        the form below. Additionally, if you encounter any issues while using
        videoNex, please use the "Report an Issue" section to notify our team.
      </p>

      <form action="submit_form.php" method="post">
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" required></input>

        <label for="email">Your Email:</label>
        <input type="email" id="email" name="email" required></input>

        <label for="message">Your Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Submit</button>
      </form>

      <h2>Report an Issue</h2>

      <p>
        If you encounter any technical issues or problems while using videoNex,
        please use the form below to report the issue to our technical support
        team:
      </p>

      <form action="report_issue.php" method="post">
        <label for="username">Your Username:</label>
        <input type="text" id="username" name="username" required></input>

        <label for="issue">Describe the Issue:</label>
        <textarea id="issue" name="issue" rows="4" required></textarea>

        <button type="submit">Report Issue</button>
      </form>
    </div>
  );
};
