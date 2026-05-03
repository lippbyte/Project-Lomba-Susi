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
        Schema::create('reports', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('reporter_id')->constrained('users')->cascadeOnDelete();
            $table->string('code', 20)->unique(); // RPT-001
            $table->string('title');
            $table->text('description');
            $table->enum('category', ['perundungan', 'fasilitas', 'keamanan', 'akademik', 'lainnya']);
            $table->enum('status', ['diterima', 'diverifikasi', 'dalam_proses', 'selesai'])->default('diterima');
            $table->boolean('is_anonymous')->default(false);
            $table->boolean('is_urgent')->default(false);
            $table->foreignUuid('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
