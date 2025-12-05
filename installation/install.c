#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

void red();
void green();
void blue();
void white();
void resetColor();


char hostIP[20];

void printLogo()
{
	red();
	printf("          _____                     \n");
	green();
	printf("_______  /  |  |___________________ \n");
	blue();
	printf("\\_  __ \\/   |  |\\___   /  _ \\_  __ \\\n");
	red();
	printf(" |  | \\/    ^   //    (  <_> )  | \\/\n");
	green();
	printf(" |__|  \\____   |/_____ \\____/|__|   \n");
	blue();
	printf("            |__|      \\/            \n");
	resetColor();
}

int hostnameSetup()
{
	printf("----------------------\n");
	printf("|     Host Setup     |\n");
	printf("----------------------\n");
	printf("Please type in Local IP of remote sever / host: ");
	scanf("%s", hostIP);
	if (hostIP == NULL) {
		perror("Invalid Input.");
			return 1;
	}
	return 0;
}

int createENVFile()
{

	FILE* envFile = fopen("r4zor_frontend/.env", "w");
	if (envFile == NULL) {
		perror("Error creating .env file.");
		return 1;
	}
	char line[50] = "VITE_HOST_ADDRESS=";
	strcat(line, hostIP);
	strcat(line, "\n");
	fprintf(envFile, "%s", line);
	fclose(envFile);

	FILE* checkExists = fopen("r4zor_frontend/.env", "r");
	if (checkExists == NULL) {
		perror("Error accessing .env file.");
		return 1;
	}
	fclose(checkExists);

	return 0;
}

void installDependencies()
{
	system("./installation/DEPENDENCIES.sh");
}

char* commandConstruct()
{
	char* command = malloc(sizeof(char) * 50);
	if (command == NULL) {
		return NULL;
	}
	strcpy(command, "mkdir backend/uploads/");
}

void commandDestruct(char* command)
{
	free(command);
}

int createDirectories()
{
	char name[20];
	system("clear");
	printf("Creating Directories:\n\n");
	system("mkdir backend/uploads/");
	int flag = 1;
	int numDirectories = 0;
	while (flag) {
		char* command = commandConstruct(); 
		printf("**Type '!' when ready to quit**\n\n");
		printf("Number of Current Directories: %d\n", numDirectories);
		printf("Type in Directory Name: ");
		scanf("%s", name);
		numDirectories++;
		system("clear");
		if (strcmp("!", name) != 0) {
			strcat(command, name);
			system(command);
			commandDestruct(command);


		}
		if (strcmp("!", name) == 0) {
			flag = 0;
			commandDestruct(command);
		}
	}
	return 0;
}

void production()
{
	system("./installation/PRODUCTION.sh");	
}

int main()
{	
	printLogo();
	int hostNameSuccess = hostnameSetup();
	if (hostNameSuccess != 0) {
		return EXIT_FAILURE;
	}

	int createENVSuccess = createENVFile();
	if (createENVSuccess != 0) {
		return EXIT_FAILURE;
	}
	
	installDependencies();

	int directorySuccess = createDirectories();
	if (directorySuccess != 0) {
		return EXIT_FAILURE;
	}

	production();
	
	return EXIT_SUCCESS;
}
