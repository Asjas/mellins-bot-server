import { Markup } from "telegraf";

export function fullBotKeyboard() {
  return Markup.keyboard([
    "Balance",
    "Statements",
    "Appointments",
    "Join Mellins Channel",
    "Branch Locator",
    "Shop Online",
    "Social Media",
  ])
    .resize()
    .oneTime();
}

export function registerKeyboard() {
  return Markup.keyboard(["Register"]).oneTime();
}

export function registerAndCallbackKeyboard() {
  return Markup.keyboard(["Register", "Request a Callback"], { columns: 2 }).oneTime();
}

export function inlineCallbackKeyboard() {
  return Markup.inlineKeyboard([Markup.button.callback("Request a Callback", "Request a Callback")]);
}

export function branchLocatorKeyboard() {
  return Markup.keyboard(["Find Closest Branch", "Provincial Branch List", "Back"]).resize().oneTime();
}

export function shareLocationKeyboard() {
  return Markup.keyboard([Markup.button.locationRequest("Share location"), "Back"], {
    columns: 2,
  }).oneTime();
}

export function shareContactNumber() {
  return Markup.keyboard([Markup.button.contactRequest("Share contact"), "Back"]);
}

export function socialMediaKeyboard() {
  return Markup.keyboard(["Instagram", "Facebook", "Back"]).resize().oneTime();
}

export function appointmentKeyboard() {
  return Markup.keyboard(["Check Upcoming Appointments", "Book Appointment", "Back"]).resize().oneTime();
}

export function joinChannelKeyboard() {
  return Markup.keyboard(["Yes, Join Channel", "Back"]).oneTime();
}

export function removeKeyboard() {
  return Markup.removeKeyboard();
}
