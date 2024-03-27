<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            'name' => $this->name,
            'image_path' => $this->image_path,
            'status' => $this->status,
            'due_date' => $this->due_date->format('Y-m-d'),
            'created_at' => $this->created_at->format('Y-m-d'),
            'assigned_user_id' => new UserResource($this->assignedUser),
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'project_id' => new UserResource($this->project),
        ];
    }
}
