install: installation/colors.o installation/install.o
	gcc installation/colors.o installation/install.o -o install

install.o: installation/install.c
	gcc -c installation/install.c

colors.o: installation/colors.c
	gcc -c -std=c99i installation/colors.c

clean:
	rm -rf installation/colors.o installation/install.o install
