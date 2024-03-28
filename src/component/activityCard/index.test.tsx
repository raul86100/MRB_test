import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./index";

describe("activityCard unitn test", () => {
  const mockdata = {
    id: 123,
    roomEntityId: 2,
    meetingName: "MRB test",
    meetingCategory: "Client Meeting",
    description: "Test description",
    startDate: "15/05/2024",
    endDate: "15/05/2024",
    startTime: "10:00 am",
    endTime: "11:00 am",
    hostEmail: "abc@gmail.com",
    status: "COMPLETED",
    roomName: "Room1",
    hostName: "ABC",
    guestList: [{ name: "xyz", email: "xyz@gmail.com" }],
    reason: null,
    feedback: true,
  };
  test("Pending card testing display", () => {
    const divison = "Pending";
  });

  test("Upcoming card testing display", () => {});
});
