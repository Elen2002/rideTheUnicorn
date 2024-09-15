step 1. open the project unicorn/ unicorn-symfony/public file on the local server and name it with the domain unicorn.int step 
2. enable local server step
3. open the unicorn/ unicorn-symfony file in the local server terminal and perform the operations
php bin/console doctrine:database:create php bin/console make:migration php bin/console doctrine:migration:migrate step
4. open the terminal in the credit-cart/cart-react file and execute npm install npm start the commands