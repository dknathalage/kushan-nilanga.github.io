import * as fs from "fs";
import * as http from "http";
import * as yaml from "js-yaml";
import * as Mustache from "mustache";

interface Resume {
  type: string;
  title: string;
  sections: Sections[];
}

interface Sections {
  type: string;
  title: string;
  data: SectionData[];
}

interface SectionData {
  type: string;
  title: string;
  data: string[];
  "top-left"?: string;
  "top-right"?: string;
  "bottom-left"?: string;
  "bottom-right"?: string;
  tags?: string[];
}

async function main() {
  try {
    // read file from command line
    const filepath = process.argv[2];

    // Read YAML file
    const yamlFile = await fs.promises.readFile(filepath, "utf8");

    // Parse YAML into Resume object
    const resume: Resume = yaml.load(yamlFile) as Resume;

    // Define HTML template
    var htmlTemplate = `
    <!DOCTYPE html>
    <html> 
        <head>
            <meta charset="utf-8">
            <title>{{ title }}</title>
            <style>
                table, th, td {
                    border-collapse: collapse;
                    border: none;
                }
                h3 { margin-bottom:5px; margin-top: 30px; }
                table { width: 100%; margin: 5px}
                .tags {
                    display: inline-block;
                    margin-right: 10px;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: #ddd;
                    font-size: 10px;
                    font-weight: bold;
                }
                .top-left {
                    float: left;
                    font-weight: bold;
                } 
                .bottom-left {
                    float: left;
                }
                .top-right, .bottom-right{
                    float: right;
                }
                .tagContainer {
                    padding: 0;
                    margin: 0;
                }
                .pointContainer {
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <h1>{{ title }}</h1>	
            {{ #sections }}
            <section>
                <h3>{{ title }}</h3>
                <hr />
                {{ #data }}
                <div>
                        <div class="table-cell">
                            <table>
                                <tr>
                                    <td class="top-left">{{ top-left }}</td>
                                    <td class="top-right">{{ top-right }}</td>
                                </tr>
                                <tr>
                                    <td class="bottom-left"><i>{{ bottom-left }}</i></td>
                                    <td class="bottom-right"><i>{{ bottom-right }}<i></td>
                                </tr>
                            </table>
                        </div>
                        {{ end }}
                        <ul class="tagContainer">
                        {{ #tags }}
                            <li class="tags">{{ . }}</li>
                        {{ /tags }}
                        </ul>                    
                        <ul class="pointContainer">
                        {{ #data }}
                            <li>{{ . }}</li>
                        {{ /data }}
                        <ul>
                    </div>
                {{ /data }}
            </section>
            {{ /sections }}
        </body>
    </html>`;
    // Render the template
    const renderedHtml = Mustache.render(htmlTemplate, resume);

    // Create output file
    await fs.promises.writeFile("resume.html", renderedHtml);

    console.log("HTML generated successfully!");

    http
      .createServer((req, res) => {
        fs.createReadStream("resume.html").pipe(res);
      })
      .listen(8080);

    console.log("Server started at http://localhost:8080");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
