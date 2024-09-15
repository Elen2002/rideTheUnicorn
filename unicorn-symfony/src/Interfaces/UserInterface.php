<?php

namespace App\Interfaces;
interface UserInterface
{
    public function register(array $params);
    public function addCoins(array $params);
    public function getUsernames(array $params);
    public function getAll();
    public function getOne($id);
}