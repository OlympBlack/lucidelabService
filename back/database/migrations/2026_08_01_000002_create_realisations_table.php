<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('realisations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category'); // STRATEGY, BRAND, DIGITAL, GROWTH, CONTENT, ADVERTISING
            $table->string('client_name');
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->string('year')->default('2026');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('realisations');
    }
};
