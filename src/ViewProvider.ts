import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class ViewProvider implements vscode.TreeDataProvider<Dependency> {
  constructor(private workspaceRoot: string, private readonly _extensionUri: vscode.Uri) {}

  getTreeItem(element: Dependency): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Dependency): Thenable<Dependency[]> {
    return Promise.resolve([]);   
  }

  private _getHtmlForWebview(webview: vscode.Webview, who: string, what = '') {
    const styleResetUri = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/media/reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/media/vscode.css")
    );
    const scriptUri = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/out/compiled/sidebar.js")
    );
    const styleMainUri = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/out/compiled/sidebar.css")
    );
    const luke = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/media/" + who + ".gif")
    );
    const land = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/media/land.png")
    );
    const title = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/media/title.png")
    );
    const audio = webview.asWebviewUri(
        vscode.Uri.parse(this._extensionUri + "/media/" + what + ".mp3")
    );

    const heights: {[key: string]: number} = {
        'luke': 200,
        'yoda': 200,
        'darth': 170,
        'grev2': 170,
        'asoka': 200,
        'kylo': 150,
        'kylo2': 150,
        'palpatine': 150,
        'maul': 200,
        'droid': 120,
        'dick': 190,
        'darth2': 170,
        'darth3': 170,
        'obi': 210,
        'asoka2': 170,
        'darth4': 150
    };
    const height: number = heights[who] || 200;

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
  <html lang="en" style="overflow:hidden; padding: 0; margin: 0; height:auto; background: #0b314733">
  <head>
    <meta charset="UTF-8">

    <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource
        }; script-src 'nonce-${nonce}';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleResetUri}" rel="stylesheet">
    <link href="${styleVSCodeUri}" rel="stylesheet">
            <link href="${styleMainUri}" rel="stylesheet">
            <script nonce="${nonce}">
                const tsvscode = acquireVsCodeApi();
            </script>

  </head>
        <body style="overflow:hidden;  padding: 0; margin: 0;  height:auto;background: #0b314733; ">
            <audio autoplay>
            <source src="${audio}" type="audio/mp3">
            </audio>
            <img src="${luke}" style="min-height:${height}px; max-height:${height}px; width:auto; position:absolute; top: ${200 - height}px; right: 0; object-fit:cover; z-index: 1000" >
            <img src="${land}"
            style=" object-fit:cover; min-height:200px; max-height:200px; width:100vw; opacity: 0.6">
            <img src="${title}">
    <script nonce="${nonce}" src="${scriptUri}"></script>
  </body>
  </html>`;
}

  private pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }
    return true;
  }
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private version: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.version;
  }

  iconPath = {
    light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
  };
}