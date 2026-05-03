<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('created_by')->constrained('users');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['aktif', 'selesai', 'dibatalkan'])->default('aktif');
            $table->string('choice_a');
            $table->string('choice_b');
            $table->date('deadline');
            $table->unsignedInteger('total_eligible')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demos');
    }
};
