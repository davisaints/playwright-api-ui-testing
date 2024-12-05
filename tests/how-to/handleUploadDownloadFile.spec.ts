import { expect, test } from "@playwright/test";
import path from "path";
import { sitesConfig } from "./sites.config";

test("Can upload and download file", async ({ page }) => {
  // Navigate to the file conversion page
  await page.goto(sitesConfig.fileUploadDownloadPage);

  // Wait for file chooser dialog
  const fileChooserPromise = page.waitForEvent("filechooser");

  // Trigger file chooser and set file to upload
  await page.getByRole("button", { name: "Choose File" }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    path.join(__dirname, "/dependencies/" + "sampleFile.jpg")
  );

  // Wait for confirmation of file addition and start the task
  await page.getByText("File added! Start task or add").waitFor();
  await page.getByRole("button", { name: "Start" }).first().click();

  // Wait for conversion to finish
  await page.waitForURL("**/result**");

  // Wait for the download event
  const downloadPromise = page.waitForEvent("download");
  await page.getByTitle("Download").click();

  // Save the downloaded file
  const download = await downloadPromise;
  const jpgFileName = download.suggestedFilename();
  const filePath = path.join(__dirname + "/dependencies/" + jpgFileName);
  await download.saveAs(filePath);

  // Verify file extension is correct
  const fileExtension = path.extname(filePath);
  expect(fileExtension).toBe(".png");
});
