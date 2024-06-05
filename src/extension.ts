// import * as vscode from 'vscode';

// export function activate(context: vscode.ExtensionContext) {

// 	console.log('Congratulations, your extension "literna-ai" is now active!');

// 	let disposable = vscode.commands.registerCommand('literna-ai.helloWorld', () => {
// 		vscode.window.showInformationMessage('Hello World from Literna.AI!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// export function deactivate() {}
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const myViewProvider = new MyViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(MyViewProvider.viewType, myViewProvider)
    );
}

class MyViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'literna-ai-view';

    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ): void {
        this._view = webviewView;

        webviewView.webview.options = {
            // Enable scripts in the webview
            enableScripts: true,

            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this.getHtmlContent(webviewView.webview);
    }

    private getHtmlContent(webview: vscode.Webview): string {
        const logoUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, './assets', './asset/logo.png'));

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Sidebar</title>
        </head>
        <body>
            <h1>Welcome to My Sidebar!</h1>
            <img src="${logoUri}" width="200" alt="Logo">
        </body>
        </html>`;
    }
}

export function deactivate() { }
