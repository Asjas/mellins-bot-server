import { Markup } from "telegraf";
import BranchRegisterCallback from "../commands/branchRegisterCallback";
import MyContext from "../types/telegram";

export function fullBotKeyboard(ctx: MyContext) {
  let buttons: string[] = [];

  if (ctx?.joinedPrivateChannel === "member") {
    buttons = [
      "Balance",
      "Statements",
      "Appointments",
      "Mellins Channel Link",
      "Branch Locator",
      "Shop Online",
      "Social Media",
    ];
  } else {
    buttons = [
      "Balance",
      "Statements",
      "Appointments",
      "Join Mellins Channel",
      "Branch Locator",
      "Shop Online",
      "Social Media",
    ];
  }

  return Markup.keyboard(buttons).resize().oneTime();
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

export function provincialBranchListKeyboard() {
  return Markup.keyboard([
    "Eastern Cape",
    "Northern Cape",
    "Western Cape",
    "Free State",
    "North West",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Back",
  ])
    .resize()
    .oneTime();
}

export async function branchListKeyboard(bot, branches) {
  try {
    await BranchRegisterCallback(bot, branches);
  } catch (err) {
    console.error(err);
  }

  const branchButtons = branches.map((branch: any) => {
    return Markup.button.callback(branch.name, branch);
  });

  return Markup.keyboard([...branchButtons, "Back to provincial branch list"])
    .resize()
    .oneTime();
}

export function shareLocationKeyboard() {
  return Markup.keyboard([Markup.button.locationRequest("Share location"), "Back"], {
    columns: 2,
  }).oneTime();
}

export function shareContactNumber() {
  return Markup.keyboard([Markup.button.contactRequest("Share contact"), "Back"], { columns: 2 });
}

export function socialMediaKeyboard() {
  return Markup.keyboard(["Instagram", "Facebook", "Back"]).resize().oneTime();
}

export function appointmentKeyboard() {
  return Markup.keyboard(["Check Upcoming Appointments", "Book Appointment", "Back"]).resize().oneTime();
}

export function joinChannelKeyboard() {
  return Markup.keyboard(["Join Channel", "Back"], { columns: 2 }).oneTime();
}

export function callbackKeyboard() {
  return Markup.keyboard(["Request a Callback", "Back"], { columns: 2 }).oneTime();
}

export function removeKeyboard() {
  return Markup.removeKeyboard();
}
