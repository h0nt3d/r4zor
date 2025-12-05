#include <stdio.h>

void red()
{
	printf("\x1b[31m");
}

void green()
{
	printf("\x1b[32m");
}

void blue()
{
	printf("\x1b[34m");
}
void white()
{
	printf("\x1b[47m");
}

void resetColor()
{
	printf("\x1b[0m");
}

