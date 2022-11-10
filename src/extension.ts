import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { ViewProvider } from './ViewProvider';

export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"darkside-sidebar",
			sidebarProvider
		)
	);

	const rootPath =
		vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
		? vscode.workspace.workspaceFolders[0].uri.fsPath
		: '';
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"darkside-sidebar-view",
			sidebarProvider
		)
	);

	// Register a custom command
	/*context.subscriptions.push(vscode.commands.registerCommand('darkside.askquestion', async () => {
		let response = await vscode.window.showInformationMessage("How are you doing?", "Good", "Bad");
		if (response === "Bad") {
			vscode.window.showInformationMessage("I'm sorry");
			
		}
	}));*/

	const chars = ['yoda', 'luke', 'kylo', 'kylo2', 'asoka', 'dick', 'droid', 'palpatine', 'darth', 'maul', 'grev2', 'darth2', 'asoka2', 'darth3', 'obi', 'darth4'];
	for (const who of chars) {
		context.subscriptions.push(vscode.commands.registerCommand('darkside.' + who, () => {
			sidebarProvider.change(who);
		}));
	}


	context.subscriptions.push(vscode.commands.registerCommand('darkside.lack', () => {
		vscode.window.showInformationMessage("I find your lack of faith disturbing");
		sidebarProvider.play('lack');
		setTimeout(() => {
			sidebarProvider.play('');
		}, 30000);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('darkside.destroy', () => {
		vscode.window.showInformationMessage("Dont make me destroy you");
		sidebarProvider.play('destroy');
		setTimeout(() => {
			sidebarProvider.play('');
		}, 30000);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('darkside.power', () => {
		vscode.window.showInformationMessage("POOOWEEEERRR!!");
		sidebarProvider.play('power');
		setTimeout(() => {
			sidebarProvider.play('');
		}, 30000);
	}));

	

	
}

// this method is called when your extension is deactivated
export function deactivate() { }
