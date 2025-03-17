---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Inquiries
css: "/static/css/inquiry.css"
---

<div class="button newsletter-button">
        <!-- <span class="newsletter-title"> -->
            <!-- <img src="./static/ruth.jpg" width="50" height="50" alt="Ruth Garbus" class="profile-image"> -->
            <!-- Ruth's Updates</span> -->
        <span class="newsletter-description">
        Subscribe to my newsletter for (very) occasional email updates about shows and releases.</span>
        <br>
        <form
            action="https://buttondown.com/api/emails/embed-subscribe/ruthgarbus"
            method="post"
            target="popupwindow"
            onsubmit="window.open('https://buttondown.com/ruthgarbus', 'popupwindow')"
            class="embeddable-buttondown-form newsletter-form"
        >
        <div>
            <input type="email" name="email" id="bd-email" placeholder="Enter your email" />
            <!-- <input type="submit" value="Sign up" /> -->
            <div class="button" style="text-align: center; background-color: #05345f; color: white; padding: 10px 20px; border: 2px outset gray; max-width: 130px; margin: 0 auto;">
    <span style="font-size: 1em;">
    <img src="./static/ruth.jpg" width="50" height="50" alt="Ruth Garbus" style="border-radius: 50%;">
    "Click here to sign up!"</span>

<!-- <br> -->
<!-- <span style="font-size: 1em;"></span> -->
</div>
        </div>
        </form>
    </div>

<p class="booking-text"><b>For booking inquiries</b>: gil@firstdatetouring.com</p>

<form name="Inquiry-form" action="https://api.web3forms.com/submit" method="POST"  aria-label="Inquiries Form">
<h2>Contact Me</h2>
<input type="hidden" name="access_key" value="e0ea36ec-c21f-484b-8224-adf6dcadd020">
<input type="hidden" name="from_name" value="Ruth Garbus Website Form">
<input type="checkbox" name="botcheck" id="" style="display: none;">
    <div class="field-label">
        <label for="name">Name</label>
    </div>
    <input class="text-field" maxlength="256" name="name" data-name="name" placeholder="" type="text" id="name"
        required="">
    <div class="field-label">
        <label for="email">Email Address</label>
    </div>
    <input class="text-field" maxlength="256" name="email" data-name="email" placeholder="" type="email"
        id="email" required="">
    <div class="field-label">
        <label for="message">Message</label>
    </div>
    <textarea data-name="message" maxlength="5000" id="message" name="message" required="" placeholder=""
        class="text-field">
    </textarea>
    <input type="submit" data-wait="Please wait..." class="submit-button" value="Submit">
</form>