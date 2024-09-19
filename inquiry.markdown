---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Inquiries
css: "/static/css/inquiry.css"
---

<p>Rates for lessons are $1million dollars on a sliding scale. That's also how much you need to pay me each show.</p>

<form name="Inquiry-form" action="https://api.web3forms.com/submit" method="POST"  aria-label="Inquiries Form">
<input type="hidden" name="access_key" value="767548e7-7fbb-4061-9f4c-8808bebd5c42">
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